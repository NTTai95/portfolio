var imgSubmit = [];

document.getElementById('file-2').addEventListener('change', function (event) {
    const alertMessage = document.getElementById('alert-message');
    const maxFiles = 3;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const preview = document.getElementById('image-preview');

    let beforeSize = 0;
    var images = Array.from(preview.getElementsByTagName('img'));
    images.forEach(img => {
        beforeSize += Number(img.dataset.size);
    });
    let beforeCount = images.length;

    const files = Array.from(event.target.files);

    files.forEach(file => {
        if (++beforeCount > maxFiles) {
            alertMessage.innerText = 'Tối đa 3 hình ảnh!';
            alertMessage.classList.add('show');
            console.log('Tối đa 3 hình ảnh!')

            setTimeout(() => {
                alertMessage.classList.remove('show');
            }, 3000);

            return;
        }

        beforeSize += file.size;

        if (beforeSize > maxSize) {
            alertMessage.innerText = 'Kích thước đã vượt quá 10MB!';
            alertMessage.classList.add('show');
            console.log('Kích thước đã vượt quá 10MB')

            setTimeout(() => {
                alertMessage.classList.remove('show');
            }, 3000);

            return;
        }

        imgSubmit[beforeCount] = file;
        showFile();

        const reader = new FileReader();

        reader.onload = function (e) {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-4', 'h-300px', 'p-2','image-preview');

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'w-100', 'h-100', 'position-relative');

            const deleteSpan = document.createElement('span');
            deleteSpan.classList.add('position-absolute', 'end-0', 'top-0', 'p-2');
            deleteSpan.innerHTML = `
                <svg class="size-icon-32 fill-dis hover:fill-primary cursor-pointer" viewBox="0 0 448 512">
                    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm88 200l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
                </svg>
            `;

            const imgElement = document.createElement('img');
            imgElement.classList.add('object-fit-contain', 'm-auto', 'w-100', 'h-100');
            imgElement.src = e.target.result;
            imgElement.dataset.size = file.size;

            cardDiv.appendChild(deleteSpan);
            cardDiv.appendChild(imgElement);
            colDiv.appendChild(cardDiv);
            preview.appendChild(colDiv);

            deleteSpan.addEventListener('click', function () {
                preview.removeChild(colDiv);
                imgSubmit.splice(imgSubmit.indexOf(file),1);
                showFile();
            });

        };

        reader.onerror = function () {
            alertMessage.innerText = 'lỗi tải ảnh!';
            alertMessage.classList.add('show');
            setTimeout(() => {
                alertMessage.classList.remove('show');
            }, 3000);
        };
        
        reader.readAsDataURL(file);
    });
});

function showFile(){
    console.log(imgSubmit)
    document.getElementById('file-2').files = fileArrayToFileList(imgSubmit);
    console.log(document.getElementById('file-2').files);
}

function fileArrayToFileList(fileArray) {
    const dataTransfer = new DataTransfer();
    fileArray.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
}