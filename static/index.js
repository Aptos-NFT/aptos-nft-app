var next_click=document.querySelectorAll(".next_button");
var main_form=document.querySelectorAll(".main");
var step_list = document.querySelectorAll(".progress-bar li");
var num = document.querySelector(".step-number");
let formnumber=0;
var addr = "";

next_click.forEach(function(next_click_form){
    next_click_form.addEventListener('click',function(){
        if(!validateform()){
            return false
        }
      if (addr == "" && formnumber == 1) {
        alert("Please connect your wallet before you proceed.");
        return;
      }
       formnumber++;
       updateform();
       progress_forward();
       contentchange();
    });
}); 

var back_click=document.querySelectorAll(".back_button");
back_click.forEach(function(back_click_form){
    back_click_form.addEventListener('click',function(){
       formnumber--;
       updateform();
       progress_backward();
       contentchange();
    });
});

var username=document.querySelector("#user_name");
var shownname=document.querySelector(".shown_name");
 

var submit_click=document.querySelectorAll(".submit_button");
submit_click.forEach(function(submit_click_form){
    submit_click_form.addEventListener('click',function(){
       shownname.innerHTML= username.value;
       formnumber++;
       updateform(); 
    });
});

var heart=document.querySelector(".fa-heart");
heart.addEventListener('click',function(){
   heart.classList.toggle('heart');
});


var share=document.querySelector(".fa-share-alt");
share.addEventListener('click',function(){
   share.classList.toggle('share');
});

 

function updateform(){
    main_form.forEach(function(mainform_number){
        mainform_number.classList.remove('active');
    })
    main_form[formnumber].classList.add('active');
} 
 
function progress_forward(){
    // step_list.forEach(list => {
        
    //     list.classList.remove('active');
         
    // });

    if (formnumber == 1)
      upload_image();

    if (formnumber == 2) {
      change_license_url();
      if (addr == "") {
        alert("Please connect your wallet before you proceed.");
        return;
      }
    }
    num.innerHTML = formnumber+1;
    step_list[formnumber].classList.add('active');
}

function change_license_url() {
  var nft_name = document.getElementById("nft-name").value;
  var desc = document.getElementById('nft-description').value;
  var image = document.getElementById('view').href;
  var name = document.getElementById('full-name').value;
  var license_type = document.getElementById('license-type').value;
  var contract_term = document.getElementById('contract-term').value;
  var royalty_amount = document.getElementById('royalty-amt').value;

  const data = {nft_name, desc, image, name, license_type, contract_term, royalty_amount};
  const string = JSON.stringify(data);
  const encodedString = btoa(string);
  document.getElementById('license').href = "/license?view=" + encodedString;
}

async function mint() {
  var nft_name = document.getElementById("nft-name").value;
  var desc = document.getElementById('nft-description').value;
  var image = document.getElementById('view').href;
  var name = document.getElementById('full-name').value;
  var license_type = document.getElementById('license-type').value;
  var contract_term = document.getElementById('contract-term').value;
  var royalty_amount = document.getElementById('royalty-amt').value;

  const data = {nft_name, desc, image, name, license_type, contract_term, royalty_amount, addr};
  const res = await fetch("/mint", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const content = await res.json();

  console.log(content);
}

function connect() {
  window.aptos.account().then((address)=> addr = address);
  document.getElementById('connect').disabled = true;
  document.getElementById('connect').innerHTML = "Connected";
}

async function upload_image() {
  var form = document.getElementById('upload');
  const url = "/upload";

  try {
      const formData = new FormData(form);
      const response = await fetch(url, {
          method: 'POST',
          body: formData
      });
      var res =  await response.json();
    document.getElementById("view").href = res.url;
  } catch (error) {
      console.error(error);
  }
}

function progress_backward(){
    var form_num = formnumber + 1;
    step_list[form_num].classList.remove('active');
    num.innerHTML = form_num;
} 
 
var step_num_content=document.querySelectorAll(".step-number-content");

 function contentchange(){
     step_num_content.forEach(function(content){
        content.classList.remove('active'); 
        content.classList.add('d-none');
     }); 
     step_num_content[formnumber].classList.add('active');
 } 
 
 
function validateform(){
    validate=true;
    var validate_inputs=document.querySelectorAll(".main.active input");
    validate_inputs.forEach(function(vaildate_input){
        vaildate_input.classList.remove('warning');
        if(vaildate_input.hasAttribute('require')){
            if(vaildate_input.value.length==0){
                validate=false;
                vaildate_input.classList.add('warning');
            }
        }
    });
    return validate;
    
}

function updateParameters() {
    console.log("Loaded")
    document.getElementById("review-nft-title").innerHTML = document.getElementById("nft-name").value;
    document.getElementById("review-nft-description").innerHTML = document.getElementById("nft-description").value

    let licenseType = document.getElementById('license-type');
    document.getElementById('review-nft-license').innerHTML = licenseType.options[ licenseType.selectedIndex ].value
}