import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage: Storage = inject(Storage);
  public readonly standartPhoto = 'p'
  public readonly standartCoverPhoto = 'cvp'

  async uploadFile(file: any): Promise<string> { // Retorne uma Promise<string>
    if (file) {
      const path = `imagens/${new Date().getTime()}_${file.name}`
      const storageRef = ref(this.storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Retorne uma Promise que resolverá com o URL da imagem após o upload
      return new Promise<string>((resolve, reject) => {
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Você pode adicionar lógica de progresso aqui, se necessário
          },
          (error) => {
            // Lida com erros de upload
            reject(error);
          },
          () => {
            // Upload concluído com sucesso, agora podemos obter o URL de download
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Resolva a Promise com o URL da imagem
              resolve(downloadURL);
            }).catch((error) => {
              // Lidar com erros ao obter o URL de download
              reject(error);
            });
          });
      });
    }

    // Retorne uma Promise resolvida com o URL padrão, se não houver arquivo
    return Promise.resolve("https://firebasestorage.googleapis.com/v0/b/learnhub-d88d5.appspot.com/o/imagens%2Fuser.png?alt=media&token=b9ab5681-d60a-493e-ba6a-dfbda81895b9");
  }

  updateFile(file: any, userPhoto: any) {
    //for (let i = 0; i < files.length; i++) {
    if (file) {
      if(userPhoto == "https://firebasestorage.googleapis.com/v0/b/learnhub-d88d5.appspot.com/o/imagens%2Fuser.png?alt=media&token=b9ab5681-d60a-493e-ba6a-dfbda81895b9") {
        return this.uploadFile(file)
      }
    }

    return "https://firebasestorage.googleapis.com/v0/b/learnhub-d88d5.appspot.com/o/imagens%2Fuser.png?alt=media&token=b9ab5681-d60a-493e-ba6a-dfbda81895b9"
  }

}
