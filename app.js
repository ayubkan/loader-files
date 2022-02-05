// import firebase from 'firebase/app'
// import 'firebase/storage'
import {upload} from './upload.js'


// const firebaseConfig = {
//   apiKey: "AIzaSyA-dBPS93gZGOP_m2qSVmE0ecxwxZWjOjg",
//   authDomain: "fir-e9fcb.firebaseapp.com",
//   projectId: "fir-e9fcb",
//   storageBucket: "fir-e9fcb.appspot.com",
//   messagingSenderId: "650992243835",
//   appId: "1:650992243835:web:4530309027e86c834f7ede"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

upload('#file', {
    multi: true, //Что бы выбрать несколько картинок
    accept: ['.png', '.jpg', '.jpeg', '.gif'], // Тип картинка
    onUpload(files, blocks) { //Загрузка картинка
        files.forEach((file, index) => {
            // Сохранить картинку
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)
            // Для прогресса
            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
              }, error => {
                console.log(error)
              }, () => {
                // Взять URL картинка
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL', url)
                  })
                })
              })
            }
          })