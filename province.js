function showListProvince(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/province",
        success: function (province){
            let content = "";
            for (let i = 0; i < province.length; i++) {
                content+=`<tr>
            <th scope="row">${province[i].id}</th>
            <td>${province[i].name}</td>
            <td>${province[i].acreage}</td>
            <td>${province[i].population}</td>
            <td>${province[i].jdp}</td>
            <td>${province[i].describe}</td>
            <td>${province[i].country.name}</td>
            <td><button class="deleteProvince" onclick="deleteProvince(${province[i].id})">Delete</button></td>
            <td><button class="editProvince" onclick="showEditForm(${province[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Edit</button></td>
</tr>`
            }
            $("#list-province").html(content)
        }
    })
}
showListProvince();

function showCountry(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/country",
        success: function (country) {
            let content = "";
            for (let i = 0; i < country.length; i++) {
                content += `<option value="${country[i].id}">${country[i].name}</option>`;
            }
            $("#listCountry1").html(content)
            $("#listCountry").html(content)
        }
    })
}
showCountry();
function deleteProvince(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/province/${id}`,
        success: showListProvince
    });
    event.preventDefault();

}

function showCreateForm(){
    let content = `<div class="container1">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label" >Name</label>
                            <input type="text" class="form-control" id="name">
                        </div>
                        <div class="mb-3">
                            <label for="area" class="form-label">Area</label>
                            <input type="text" class="form-control" id="area">
                        </div>
                        <div class="mb-3">
                            <label for="population" class="form-label">Population</label>
                            <input type="text" class="form-control" id="population">
                        </div>
                        <div class="mb-3">
                            <label for="gdp" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="gdp">
                        </div>
                        <div class="mb-3">
                            <label for="des" class="form-label">Description</label>
                            <input type="text" class="form-control" id="des">
                        </div>
                        <div class="mb-3">
                            <label for="listCountry1" class="form-label">Country</label>
                            <select  id="listCountry1" class="form-control"></select>                             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="createProvince()" data-bs-dismiss="modal">Create</button>

                        </div>
                    </form>
                </div>`
    $("#showModal").html(content);
    showCountry();
}


function createProvince(){
   let name = $('#name').val();
   let acreage = $('#area').val();
   let population =$('#population').val();
   let jdp = $('#gdp').val();
   let describe = $('#des').val();
   let country = $(`#listCountry1`).val();
   let newProvince = {
       "name": name,
       "acreage": acreage,
       "population": population,
       "jdp": jdp,
       "describe": describe,
       "country": {
           "id": country
       }
   };
   $.ajax({
       headers:{
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       type: "POST",
       data: JSON.stringify(newProvince),
       url: "http://localhost:8080/province",
       success: showListProvince
   });
   event.preventDefault();
}

function showEditForm(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name1" class="form-label" >Name</label>
                            <input type="text" class="form-control" id="name1">
                        </div>
                        <div class="mb-3">
                            <label for="area1" class="form-label">Area</label>
                            <input type="text" class="form-control" id="area1">
                        </div>
                        <div class="mb-3">
                            <label for="population1" class="form-label">Population</label>
                            <input type="text" class="form-control" id="population1">
                        </div>
                        <div class="mb-3">
                            <label for="gdp1" class="form-label">GDP</label>
                            <input type="text" class="form-control" id="gdp1">
                        </div>
                        <div class="mb-3">
                            <label for="des1" class="form-label">Description</label>
                            <input type="text" class="form-control" id="des1">
                        </div>
                        <div class="mb-3">
                            <label for="listCountry" class="form-label">Country</label>
                            <select id="listCountry" class="form-control"></select>                             
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="editCity(${id})" data-bs-dismiss="modal">Edit</button>

                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    showCountry();
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/province/${id}`,
        success: function (province){
            $('#name1').val(province.name)
            $('#area1').val(province.acreage)
            $('#population1').val(province.population)
            $('#gdp1').val(province.jdp)
            $('#des1').val(province.describe)
            $('#listCountry').val(province.country.id)
        }
    })
}
function editCity(id) {
    let name = $('#name1').val()
    let acreage = $('#area1').val();
    let population =$('#population1').val();
    let jdp = $('#gdp1').val();
    let describe = $('#des1').val();
    let country = $(`#listCountry`).val();
    let newProvince = {
        "name": name,
        "acreage": acreage,
        "population": population,
        "jdp": jdp,
        "describe": describe,
        "country": {
            "id": country
        }
    };
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newProvince),
        url: `http://localhost:8080/province/${id}`,
        success: showListProvince
    });
    event.preventDefault();
}