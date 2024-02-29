

const laodPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}



const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // display show all button 
    const Shoeallcontainer = document.getElementById('show-all-container');

    if (phones.length > 12 && !isShowAll) {
        Shoeallcontainer.classList.remove('hidden')
    }
    else {
        Shoeallcontainer.classList.add('hidden')
    }

    // console.log("is show all", isShowAll);

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }





    phones.forEach(phone => {
        // console.log(phone);

        // 2 create a div
        const phonecard = document.createElement('div');
        phonecard.classList = `card bg-gray-100 p-4 shadow-xl`;

        // step number 3 : set inner html


        phonecard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick= "handleShowdetails('${phone.slug}');
                        show_details_modal.showModal()"  class="btn btn-primary">Show Details</button>
                      </div>
                    </div> `
        // step 4 : append child

        phoneContainer.appendChild(phonecard)


    })

    Toggoleloading(false);

}

const handleShowdetails = async (id) => {
    console.log('clicked btn', id);
    // load single data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const date = await res.json();
    const phone = date.data;

    ShowPhonedetails(phone);


}

const ShowPhonedetails = (phone) => {

    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name


    const ShowDetailContainer = document.getElementById('Show-detail-container');
    ShowDetailContainer.classList = `text-center font-4xl gap-4`

    ShowDetailContainer.innerHTML = `

       <img src="${phone.image}" alt="" />
       <p><span>Storage:</span>${phone?.
            mainFeatures?.storage}</p>

        <p><span>GPS:</span>${phone?.others?.GPS}</p>
    
    
    
    `




    // show the model 

}











const handlScore = (isShowAll) => {
    Toggoleloading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    laodPhone(searchText, isShowAll)
}


const Toggoleloading = (isLoading) => {
    const loadingSppiner = document.getElementById('loading-spinner');

    if (isLoading) {
        loadingSppiner.classList.remove('hidden')
    }
    else {
        loadingSppiner.classList.add('hidden')
    }
}


//    handle show all

const handleShowAll = () => {
    handlScore(true);
}




laodPhone();