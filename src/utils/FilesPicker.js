import DocumentPicker from 'react-native-document-picker'
import { check, request, RESULTS, PERMISSIONS, } from 'react-native-permissions';

const PICKER_FILE_AUDIO = DocumentPicker.types.audio;
const PICKER_FILE_IMAGE = DocumentPicker.types.images;

class SelectedFile {
  constructor(pickedFile) {
    this.path = pickedFile.uri
      .replace('content://com.android.externalstorage.documents/document', 'file:///storage')
      .replace('primary', 'emulated/0')
      .replace('%3A', '/')
      .replace('%2F', '/');;
    this.type = pickedFile.type;
    this.name = pickedFile.name;
    this.size = pickedFile.size;
  }
}

const requestReadExternalStoragePermission = async () => {
  let checkPermission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  if (checkPermission === RESULTS.DENIED) {
    console.log('Requesting READ_EXTERNAL_STORAGE permission');
    checkPermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    return checkPermission;
  }
  return checkPermission;
}

export const showAudioFilesPickerDialog = async () => {
  const requestResult = await requestReadExternalStoragePermission();
  if (requestResult === RESULTS.GRANTED) {
    const pickedFiles = await DocumentPicker.pickMultiple({ type: PICKER_FILE_AUDIO });
    const selectedFiles = [];
    pickedFiles.forEach(pickedFile => {
      selectedFiles.push(new SelectedFile(pickedFile));
    });
    return selectedFiles;
  }
  throw new Error('READ_EXTERNAL_STORAGE permission is not GRANTED');
}

export const showImageFilePickerDialog = async () => {
  const requestResult = await requestReadExternalStoragePermission();
  if (requestResult === RESULTS.GRANTED) {
    const pickedFile = await DocumentPicker.pick({ type: PICKER_FILE_IMAGE });
    return new SelectedFile(pickedFile);
  }
  throw new Error('READ_EXTERNAL_STORAGE permission is not GRANTED');
}