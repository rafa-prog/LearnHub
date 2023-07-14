import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage: Storage = inject(Storage);
  public readonly standartPhoto = 'p'
  public readonly standartCoverPhoto = 'cvp'

  uploadFile(file: any) {
    //for (let i = 0; i < files.length; i++) {
      if (file) {
        const path = `imagens/${new Date().getTime()}_${file.name}`
        const storageRef = ref(this.storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                alert("Você não possui permissão para isso!")
                break;
              case 'storage/canceled':
                alert('Download cancelado!')
                break;
              case 'storage/unknown':
                alert('Um erro inesperado aconteceu!')
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              return downloadURL;
            });
          })

    }
  }

  deleteFile(link_file: string) {
    const storageRef = ref(this.storage, link_file);

  }

}
