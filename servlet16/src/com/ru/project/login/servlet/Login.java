package com.ru.project.login.servlet;

import com.google.gson.Gson;
import com.ru.project.counter.ServletCounter;
import com.ru.project.login.entry.User;
import com.ru.project.login.service.LoginSerInter;
import com.ru.project.login.service.imp.LoginSerImp;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.*;
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
        PrintWriter out = resp.getWriter();
        String userName = req.getParameter("userName");
        String password = req.getParameter("password");
        log.debug("用户名：" + userName + "密码：" + password);

        try {
            //得到user对象
            Object[] obj = loginSer.getUser(userName,password);
            if (obj != null){
                //将总登陆计数器对象放入session
                putCounterToSession(req);
                //将user对象放入session
                putUserToSession(req, obj[1].toString());
                //添加/修改/删除servletContext属性,触发ServletContextAttributeListener监听器
                addServletContextAttribute(req);
                modifyServletContextAttribute(req);
                removeServletContextAttribute(req);
                //处理cookie
                handleCookie(req, resp);

                //将需要返回的数据转换成json格式  返回
                Gson gson = new Gson();
                String message = gson.toJson("success_" + req.getSession().getId());
                out.print(message);
            }else {
                Gson gson = new Gson();
                String message = gson.toJson("fail");
                out.print(message);
            }
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    /**
     * 处理sesssion
     * @param request
     */
    private void handleSession(HttpServletRequest request){
        HttpSession session = request.getSession();
        //添加session属性
        session.setAttribute("handleSession", "添加一个session属性");
        //修改session属性
        session.setAttribute("handleSession", "修改一个session属性");
        //删除session属性
        session.setAttribute("handleSession", null);
    }

    /**
     * cookie操作
     * @param request
     */
    private void handleCookie(HttpServletRequest request,  HttpServletResponse response){
        //得到cookie
        Cookie[] cookies = request.getCookies();
        System.out.println("cookie数组的长度：" + cookies.length);
        for (Cookie cookie : cookies){
            System.out.println("***************************--开始");
            System.out.println("cookie路径：" + cookie.getPath());
            System.out.println("cookie最大生命周期：" + cookie.getMaxAge());
            System.out.println("cookie名：" + cookie.getName());
            System.out.println("cookie值：" + cookie.getValue());
            System.out.println("cookie描述：" + cookie.getComment());
            System.out.println("cookie：" + cookie.toString());
            System.out.println("***************************--结束");
        }
        //将JSESSIONID放入cookie
        Cookie cookie = new Cookie("JSESSIONID", request.getSession().getId());
        cookie.setMaxAge(3600);
        response.addCookie(cookie);
    }

    /**
     * 将计数器对象放入session
     * @param request
     */
    private void putCounterToSession(HttpServletRequest request){
        ServletCounter counter = (ServletCounter) request.getSession().getServletContext().getAttribute("counter");
        counter.setPeopleNumber(counter.getPeopleNumber() + 1);
        request.getSession().setAttribute("counter", counter);
    }

    /**
     * 将user对象放入session
     * @param request
     * @param userName
     */
    private void putUserToSession(HttpServletRequest request, String userName){
        User user = new User();
        user.setUserName(userName);
        request.getSession().setAttribute("user", user);
        System.out.println("用户信息：" + ((User) request.getSession().getAttribute("user")).getUserName());
    }

    /**
     * 添加一个servletContext属性
     * @param request
     */
    private void addServletContextAttribute(HttpServletRequest request){
        ServletContext sc = request.getSession().getServletContext();
        sc.setAttribute("addContext", "添加了一个servletContext属性");
    }

    /**
     * 修改servletContext属性
     * @param request
     */
    private void modifyServletContextAttribute(HttpServletRequest request){
        ServletContext sc = request.getSession().getServletContext();
        sc.setAttribute("addContext", "修改servletContext属性addContext");
    }

    /**
     * 删除servletContext属性
     * @param request
     */
    private void removeServletContextAttribute(HttpServletRequest request){
        ServletContext sc = request.getSession().getServletContext();
        sc.setAttribute("addContext", null);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //如果是post提交直接使用doGet方法
        this.doGet(req,resp);
    }
}
