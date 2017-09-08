
//submit username psssword to login
var submit=document.getElementById('submit_btn');
submit.onclick=function()
{
    var request=new XMLHttpRequest();//make a request to counter endpoint
     
    request.onreadystatechange = function()
    {
        if(request.readyState === XMLHttpRequest.DONE)
        {
            if(request.status === 200)
            {
                console.log("user logged in");
                alert("log in successfull!!");
            } 
            else if(request.status == 403 )
            {
                alert("username/password incorrect!!")
            }
            else if(request.status === 500)
            {
                alert("somehing went wrong in the server!!");
            }
        }
    };
    var name = document.getElementById('username').value;//if this is declared outside onclick function then it would read what is saved when doc is loade
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('GET','http://pratik1rn13cs064.imad.hasura-app.io/user-login',true);
    request.setRequestHeader('content-type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
};    

