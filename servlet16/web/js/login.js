/**
 * Created with IntelliJ IDEA.
 * User: 成如
 * Date: 13-11-17
 * Time: 上午11:56
 * To change this template use File | Settings | File Templates.
 */
function logCheck(){
    var userName = $("#userName").val();
    var password = $("#password").val();

    var params = {
        "userName":userName,
        "password":password
    };
    $.ajax({
        type:"post",
        url:"/login",
        data:params,
        dataType:"json",
        success:function(data){
            if(data == "success"){
                window.location.href = "jsp/main.jsp";
            }else if(data == "fail"){
                alert("用户名或密码错误");
            }
        },
        error:function(){
            alert("对不起,登陆失败!");
        }
    });
}