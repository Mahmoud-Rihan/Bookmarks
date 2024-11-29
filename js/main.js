var bookmarkNameInput = document.getElementById('bookmarkName');
var siteUrlInput = document.getElementById('siteUrl');
var addBtn = document.getElementById('btn');
var sites = [];
var inputs = document.getElementsByClassName('form-control');
var currentIndex=0;
var alertNameInput =document.getElementById('alertName');
var alertUrlInput =document.getElementById('alertUrl');
var restBtn =document.getElementById('rest');

if(JSON.parse(localStorage.getItem('SiteList')!=null))
{
    sites = JSON.parse(localStorage.getItem('SiteList'));
    displayData();
}

restBtn.onclick=function(){
    clearForm();
    bookmarkNameInput.classList.remove('is-valid');
    bookmarkNameInput.classList.remove('is-invalid');
    siteUrlInput.classList.remove('is-valid');
    siteUrlInput.classList.remove('is-invalid');

    alertNameInput.classList.add('d-none');
    alertUrlInput.classList.add('d-none');
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == 'Add') { 
        createSite();
    }
    else {  
        updateSite()
    }
    displayData();
    clearForm();
}

function createSite(){
    var site = {
        bookmarkName: bookmarkNameInput.value,
        siteUrl : siteUrlInput.value
    }
    if(site.bookmarkName && site.siteUrl !=''){
        sites.push(site);
        localStorage.setItem('SiteList',JSON.stringify(sites));

        bookmarkNameInput.classList.remove('is-valid');
        bookmarkNameInput.classList.remove('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        siteUrlInput.classList.remove('is-invalid');

        alertNameInput.classList.add('d-none');
        alertUrlInput.classList.add('d-none');

        addBtn.disabled='true';
    }
}
function displayData() {
    var siteslist = '';
    for(var i=0;i<sites.length;i++)
    {
        siteslist += `<tr>
                      <td class='text'>${sites[i].bookmarkName}</td>
                       <td>
                         <a class='btn btn-primary mb-5' href='${sites[i].siteUrl}' target='_blank'>Visit</a>
                         <button onclick="getSiteInfo(${i})" class='btn btn-warning mb-5 mx-3 hov1'>Update</button>
                         <button onclick="deleteSite(${i})" class='btn btn-danger mb-5 hov2'>Delete</button>
                       </td>
                      </tr>`
    }
    document.getElementById('tableBody').innerHTML=siteslist;
}
function clearForm(){
    for(var i =0; i<inputs.length; i++)
    {
        inputs[i].value = '';
    }
}
function deleteSite(index) {
    sites.splice(index, 1);
    displayData();
    localStorage.setItem('SiteList', JSON.stringify(sites));
}
function getSiteInfo(index) {
    currentIndex=index;
    var currentSite = sites[index];
    bookmarkNameInput.value = currentSite.bookmarkName;
    siteUrlInput.value = currentSite.siteUrl;
    addBtn.innerHTML = 'Update';
}
function updateSite(){
    var site = {
        bookmarkName: bookmarkNameInput.value,
        siteUrl : siteUrlInput.value
    }
    if(site.bookmarkName && site.siteUrl !=''){
        bookmarkNameInput.classList.remove('is-valid');
        bookmarkNameInput.classList.remove('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        siteUrlInput.classList.remove('is-invalid');

        alertNameInput.classList.add('d-none');
        alertUrlInput.classList.add('d-none');

        addBtn.disabled='true';
    }
    sites[currentIndex]=site;
    localStorage.setItem('SiteList', JSON.stringify(sites))
    addBtn.innerHTML = 'Add';
}
bookmarkNameInput.onkeyup=function(){
    var bookmarkNameRejex = /^[a-zA-Z]{1,9}/;
    flag1 = bookmarkNameRejex.test(bookmarkNameInput.value);
    if(bookmarkNameRejex.test(bookmarkNameInput.value))
    {
        addBtn.removeAttribute('disabled');
        bookmarkNameInput.classList.add('is-valid');
        bookmarkNameInput.classList.remove('is-invalid');
        alertNameInput.classList.add('d-none');
    }
    else{
        addBtn.disabled='true';
        bookmarkNameInput.classList.add('is-invalid');
        bookmarkNameInput.classList.remove('is-valid');
        alertNameInput.classList.remove('d-none');
    }
}
siteUrlInput.onkeyup=function(){
    var siteUrlRejex = /^(ftp|http|https):\/\/[^ "]+$/;
    flag2=siteUrlRejex.test(siteUrlInput.value);
    if(siteUrlRejex.test(siteUrlInput.value))
    {
        addBtn.removeAttribute('disabled');
        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
        alertUrlInput.classList.add('d-none');
    }
    else{
        addBtn.disabled='true';
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        alertUrlInput.classList.remove('d-none');
    }
}
searchInput.onkeyup = function () {
    var siteslist = '';
    for (var i = 0; i < sites.length; i++) 
    if (sites[i].bookmarkName.toLowerCase().includes(searchInput.value.toLowerCase())) {
    {
        siteslist += `<tr>
                      <td class='text'>${sites[i].bookmarkName}</td>
                       <td>
                         <a class='btn btn-primary mb-5' href='${sites[i].siteUrl}' target='_blank'>Visit</a>
                         <button onclick="getSiteInfo(${i})" class='btn btn-warning mb-5 mx-3 hov1'>Update</button>
                         <button onclick="deleteSite(${i})" class='btn btn-danger mb-5 hov2'>Delete</button>
                       </td>
                      </tr>`
    }
    document.getElementById('tableBody').innerHTML=siteslist;
  }
}




