package com.ru.project.login.servlet;

import com.google.gson.Gson;
import com.ru.project.login.entry.User;
import com.ru.project.login.service.LoginSerInter;
import com.ru.project.login.service.imp.LoginSerImp;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Description:登陆操作
 * User: NanChengRu
 * Date: 13-11-17
 * Time: 下午12:58
 * JDK: 1.6
 * version: 1.0
 */
public class Login extends HttpServlet{
    private Logger log = Logger.getLogger(Login.class);
    private String message;
    LoginSerInter loginSer = new LoginSerImp();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp. getWriter();
        String userName = req.getParameter("userName");
        String password = req.getParameter("password");
        log.debug("用户名：" + userName + "密码：" + password);

        //得到user对象
        Object[] obj = loginSer.getUser(userName,password);
        if (obj != null){
            User user = new User();
            user.setUserName(obj[1].toString());
            req.getSession().setAttribute("user", user);
            log.info("用户信息：" + ((User)req.getSession().getAttribute("user")).getUserName());
            //将需要返回的数据转换成json格式  返回
            Gson gson = new Gson();
            String message = gson.toJson("success");
            out.print(message);
        }else {
            Gson gson = new Gson();
            String message = gson.toJson("fail");
            out.print(message);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //如果是post提交直接使用doGet方法
        this.doGet(req,resp);
    }
}
