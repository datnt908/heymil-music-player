import RNFS from 'react-native-fs'

export const readMp3Duration = async (filePath) => {
  const framesCount = await readFramesCount(filePath);
  return Math.ceil(framesCount * 0.026);
}

const readID3Header = async (filePath) => {
  const TAGidentifier = await RNFS.read(filePath, 3, 0, 'ascii');
  if (TAGidentifier === 'ID3')
    return TAGidentifier;
  else
    return '';
}

const readFramesCount = async (filePath) => {
  const TAGidentifier = await readID3Header(filePath);
  let TAGsize = 0;
  if (TAGidentifier === 'ID3') {
    const TAGsizeAscii = await RNFS.read(filePath, 4, 6, 'ascii');
    const dataView = convertAsciiToDataView(TAGsizeAscii);
    TAGsize += convertBinaryToTAGsize(dataView.getUint32(0)) + 10;
  }
  const xingHeaderAscii = await RNFS.read(filePath, 4, TAGsize + 36, 'ascii');
  if (xingHeaderAscii === 'Info') {
    const framesCountAscii = await RNFS.read(filePath, 4, TAGsize + 44, 'ascii');
    const dataView = convertAsciiToDataView(framesCountAscii);
    return convertBinaryToInt(dataView.getUint32(0));
  }
  return 0;
}

const convertBinaryToTAGsize = (binary) => {
  const mask = 0b01111111;
  let b0 = binary & mask;
  let b1 = (binary >> 8) & mask;
  let b2 = (binary >> 16) & mask;
  let b3 = (binary >> 24) & mask;
  return (b3 << 21) | (b2 << 14) | (b1 << 7) | b0;
}

const convertBinaryToInt = (binary) => {
  const mask = 0b11111111;
  let b0 = binary & mask;
  let b1 = (binary >> 8) & mask;
  let b2 = (binary >> 16) & mask;
  let b3 = (binary >> 24) & mask;
  return (b3 << 24) | (b2 << 16) | (b1 << 8) | b0;
}

const convertAsciiToDataView = (ascii) => {
  const buffer = new ArrayBuffer(ascii.length);
  const dataView = new DataView(buffer, 0, ascii.length);
  for (let i = 0; i < ascii.length; ++i)
    dataView.setUint8(i, ascii.charCodeAt(i));
  return dataView;
}