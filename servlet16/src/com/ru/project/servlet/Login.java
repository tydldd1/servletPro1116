package com.ru.project.servlet;

import com.google.gson.Gson;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //将需要返回的数据转换成json格式返回
        Gson gson = new Gson();
        String message = gson.toJson("success");
        resp.setCharacterEncoding("UTF-8");
        resp. getWriter().print(message);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //如果是post提交直接使用doGet方法
        this.doGet(req,resp);
    }
}
