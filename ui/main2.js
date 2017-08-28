var comments=[];
var comm_sub=document.getElementById('submit_btn');
comm_sub.onclick=function()
{
    var comment=document.getElementById('comment').innerHTML;
    comments.push(comment);
    document.getElementById('comment').innerHTML=comments;
    
};
l