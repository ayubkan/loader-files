  // Списал в интернете , это сколько kb занимает 
  function bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (!bytes) {
        return '0 Byte'
      }
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
  }

  const element = (tag, classes = [], content) => {
      const node = document.createElement(tag)
    
      if (classes.length) {
        node.classList.add(...classes)
      }
    
      if (content) {
        node.textContent = content
      }
    
      return node
    }
    function noop() {}
    export function upload(selector, options = {}) {
      let files = [] //удаление картинка через крестик
      const onUpload = options.onUpload ?? noop
      const input = document.querySelector(selector)
      const preview = element('div', ['preview']) //Создаю div для список картинков

      // preview.classList.add('preview')

      const open = element('button', ['btn'], 'Открыть')
      const upload = element('button', ['btn', 'primary'], 'Загрузить')
      upload.style.display = 'none'

      // Что бы выбрать несколько картинок
      if (options.multi) {
          input.setAttribute('multiple', true)
        }

      // Тип картинка
      if (options.accept && Array.isArray(options.accept)) {
          input.setAttribute('accept', options.accept.join(','))
        }

        input.insertAdjacentElement('afterend', preview)
        input.insertAdjacentElement('afterend', upload)
        input.insertAdjacentElement('afterend', open)
      
      // Функция выбров картинка
      const triggerInput = () => input.click()

      // Входящие картинки которое мы выбираем
      const changeHandler = event => {
          if (!event.target.files.length) {
            return
          }

          // Изменяю files на массив
          files = Array.from(event.target.files)
          //Итарация по файл
          preview.innerHTML = ''
          upload.style.display = 'inline'
          files.forEach(file => {
              if (!file.type.match('image')) {
                return
              }
          // превью картинка
          const reader = new FileReader()
          
          reader.onload = ev => {
              const src = ev.target.result
              //создание картинки
              preview.insertAdjacentHTML('afterbegin', `
              <div class="preview-image">
                <div class="preview-remove" data-name="${file.name}">&times;</div>
                <img src="${src}" alt="${file.name}" />
                <div class="preview-info">
                  <span>${file.name}</span>
                  ${bytesToSize(file.size)}
                </div>
              </div>
            `)
          }

          //  куда мы передаём файл
          reader.readAsDataURL(file)
      })
    }

      //Удаление картинка
      const removeHandler = event => {
          if (!event.target.dataset.name) {
            return
          }
      

          const {name} = event.target.dataset
      files = files.filter(file => file.name !== name)

      if (!files.length) {
          upload.style.display = 'none'
        }

        const block = preview
        .querySelector(`[data-name="${name}"]`)
        .closest('.preview-image')

        block.classList.add('removing')
      setTimeout(() => block.remove(), 300)
    }

    const clearPreview = el => {
      el.style.bottom = '4px'
      el.innerHTML = '<div class="preview-info-progress"></div>'
    }
      // Кнопка Загрузить
      const uploadHandler = () => {
          preview.querySelectorAll('.preview-remove').forEach(e => e.remove()) // Удаляю крестики в загрузке
          // Удаление информации картинок
          const previewInfo = preview.querySelectorAll('.preview-info')
          previewInfo.forEach(clearPreview)
          onUpload(files, previewInfo) // Загрузка картинок
      }

      open.addEventListener('click', triggerInput)
      input.addEventListener('change', changeHandler)
      preview.addEventListener('click', removeHandler)
      upload.addEventListener('click', uploadHandler)
  }