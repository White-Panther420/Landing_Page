const sign_up = document.querySelectorAll(".action_button");

//Inputs
const password = document.getElementById("password");
const pass_confirm = document.getElementById("password_confirm");

const pass_div = document.querySelector(".password");
const pass_confirm_div = document.querySelector(".password_confirmation");

const invalid_pass_msg = document.createElement("p");
sign_up.forEach(btn => {
    btn.addEventListener("onClick", () =>{
        location.href = "sign_up.html" //Lead user to sign up form
    });
});

function checkPass()
{
    if(event.keyCode === 13) //User presses enter
    {
        var pass =  password.value
        var pass_confirmed = pass_confirm.value
        if(pass !== pass_confirmed )
        {
            password.setCustomValidity("invalud")
            invalid_pass_msg.textContent = "*Passwords do not match";
            invalid_pass_msg.classList.add("invalid_pass")
            pass_div.append(invalid_pass_msg)
            console.log("NOT EQUEAL");
        }
        else
        {
            password.setCustomValidity("")
            invalid_pass_msg.textContent = "";
        }
    }
}

function btnCheckPass()
{
    var pass =  password.value
    var pass_confirmed = pass_confirm.value
    if(pass !== pass_confirmed )
    {
        password.setCustomValidity("invalud")
        invalid_pass_msg.textContent = "*Passwords do not match";
        invalid_pass_msg.classList.add("invalid_pass")
        pass_div.append(invalid_pass_msg)
    }
    else
    {
        password.setCustomValidity("")
        invalid_pass_msg.textContent = "";
    }
}