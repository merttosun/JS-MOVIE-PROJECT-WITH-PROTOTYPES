const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];// ikinci cardBodyyimizi seçmek için
const clear = document.getElementById("clear-films");

//UI Objesini Başlatma

const ui = new UI();

//Storage Objesi üret
const storage = new Storage();


//TÜm Eventleri Yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        //localstoragedan tüm arrayimizialmamız gerekiyor
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value; // inputtan değerimizi alıyoruz
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director ==="" || url === ""){
        //herhangi biri bile boş ise hata vercek
        ui.displayMessages("Tüm Alanları Doldurun..","danger");// eksik alan oldgunda hata vericek.

    }else{
        //Yeni Film
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // Arayüze Film Ekleme
        storage.addFilmToStorage(newFilm);

        ui.displayMessages("Film Başarıyla Eklendi..", "success");
        
    
    }

    ui.clearInputs(titleElement,directorElement,urlElement);// film ekledikten sonra yazılar inputtan silinsin yazdıgımız fonk



    e.preventDefault();
}

function deleteFilm(e){
    //silme butonu (a href) den film elementine (tr ye) ulaşmak için iki kez üst parenta gidicez
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent); // butonun parentına çıktıgımızda son tdye ulaşırız, bu son td nin iki önceki kardeşi film adı oluyor.

        ui.displayMessages("Silme İşlemi Başarılı", "success");

        
    }
}

function clearAllFilms(){
    if(confirm("Emin Misiniz ?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
    
}