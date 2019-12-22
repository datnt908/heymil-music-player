import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
} from "react-native-permissions";
import DocumentPicker from "react-native-document-picker";

class SelectedFile {
  constructor(result) {
    this.filePath = result.uri
      .replace("content://com.android.externalstorage.documents/document", "file:///storage")
      .replace("primary", "emulated/0")
      .replace("%3A", "/")
      .replace("%2F", "/");;
    this.type = result.type;
    this.fileName = result.name;
    this.size = result.size;
  }
}

export default class FilesPicker {
  static requestReadExternalStoragePermission = () => {
    return new Promise((resolve, reject) => {
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
        switch (result) {
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
              switch (result) {
                case RESULTS.GRANTED:
                  console.log("Request READ_EXTERNAL_STORAGE permission succesful");
                  resolve(result);
                  break;
                default:
                  reject(result);
                  break;
              }
            })
            break;
          case RESULTS.GRANTED:
            resolve(result);
            break;
          default:
            reject(result);
            break;
        }
      }).catch(error => { reject(error); });
    });
  }

  static showAudioFilesPickerDialog = () => {
    return new Promise((resolve, reject) => {
      this.requestReadExternalStoragePermission().then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            DocumentPicker.pickMultiple({ type: DocumentPicker.types.audio }).then(results => {
              const selectedFiles = [];
              results.forEach(element => {
                const selectedFile = new SelectedFile(element);
                selectedFiles.push(selectedFile);
              });
              resolve(selectedFiles);
            }).catch(error => { reject(error); });
            break;
          default:
            reject(result);
            break;
        }
      }).catch(error => { reject(error); });
    });
  }

  static showImageFilePickerDialog = () => {
    return new Promise((resolve, reject) => {
      this.requestReadExternalStoragePermission().then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            DocumentPicker.pick({ type: DocumentPicker.types.images }).then(result => {
              const selectedFile = new SelectedFile(result);
              resolve(selectedFile);
            });
            break;
          default:
            reject(result);
            break;
        }
      }).catch(error => { reject(error); });
    });
  }
}