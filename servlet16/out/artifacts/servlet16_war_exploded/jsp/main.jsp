<%@ page import="com.ru.project.login.entry.User" %>
<%--
  Created by IntelliJ IDEA.
  User: 成如
  Date: 13-11-17
  Time: 下午2:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
    User user = (User) request.getSession().getAttribute("user");
    String userName = user.getUserName();
%>
<html>
  <head>
    <base href="<%=basePath%>">
    <title></title>
  </head>
  <body>
        <div>主页面</div>
    <div>欢迎：<%=userName %></div>
    <div><a href="/jumpPage">servlet跳转页面-重定向和转发</a></div>
    <div><a href="jsp/difference.jsp">getAttribute()和getParameter()的区别</a></div>
  </body>
</html>