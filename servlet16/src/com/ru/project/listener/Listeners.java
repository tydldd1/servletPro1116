package com.ru.project.listener;
/**
 * Created by 成如 on 13-12-12.
 *
 * ServletContextListener用于监听servlet环境的创建和销毁
 * HttpSessionListener用于监听session的创建和销毁
 * HttpSessionAttributeListener用于监听session中的增删改操作
 */

import com.ru.project.counter.ServletCounter;
import com.ru.project.utils.ReadWriteFile;
import org.apache.log4j.Logger;

import javax.servlet.*;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import javax.servlet.http.HttpSessionBindingEvent;

public class Listeners implements ServletContextListener, ServletContextAttributeListener, HttpSessionListener, HttpSessionAttributeListener {
    Logger logger = Logger.getLogger(Listeners.class);

    /**
     * ServletContextListener接口，它能够监听ServletContext对象的生命周期，实际上就是监听Web应用的生命周期。

     *当Servlet容器启动或终止Web应用时，会触发ServletContextEvent事件，该事件由 ServletContextListener 来处理。
     * 在 ServletContextListener 接口中定义了处理ServletContextEvent事件的两个方法。

     *contextInitialized(ServletContextEvent sce)：当Servlet容器启动Web应用时调用该方法。
     * 在调用完该方法之后，容器再对Filter初始化，并且对那些在Web应用启动时就需要被初始化的Servlet进行初始化。

     *contextDestroyed(ServletContextEvent sce)：当Servlet容器终止Web应用时调用该方法。
     * 在调用该方法之前，容器会先销毁所有的Servlet和Filter过滤器。
     * @param sce
     */
    public void contextInitialized(ServletContextEvent sce) {
        int number = 0;
        System.out.println("servletContext环境创建，web启动");

        //web启动时，向ServletContext中添加一个计数器对象，这个对象保存用户登录的次数
        ServletContext sc = sce.getServletContext();

        //计数器对象
        ServletCounter counter = new ServletCounter();
        String filePath = sc.getRealPath("/documents/counter");
        String num = ReadWriteFile.ReadFile(filePath);
        if (num != null && !num.equals("")){
            number = Integer.parseInt(num);
        }
        counter.setPeopleNumber(number);

        sc.setAttribute("counter",counter);
        System.out.println("总登陆人数" + number);

    }

    public void contextDestroyed(ServletContextEvent sce) {
        String filePath = sce.getServletContext().getRealPath("/documents/counter");

        //web关闭时，将登陆次数写入文件
        ServletCounter counter = (ServletCounter) sce.getServletContext().getAttribute("counter");
        String number = counter.getPeopleNumber() + "";
        ReadWriteFile.writeFile(number, filePath);

        logger.debug("ServletContext被销毁，web关闭");
    }

    /**
     * ServletContextAttributeListener接口用于监听servletcontext环境域中增、删、改操作
     *
     */
    @Override
    public void attributeAdded(ServletContextAttributeEvent servletContextAttributeEvent) {

    }

    @Override
    public void attributeRemoved(ServletContextAttributeEvent servletContextAttributeEvent) {

    }

    @Override
    public void attributeReplaced(ServletContextAttributeEvent servletContextAttributeEvent) {

    }

    // -------------------------------------------------------
    // HttpSessionListener implementation
    // -------------------------------------------------------
    public void sessionCreated(HttpSessionEvent se) {
      /* Session is created. */
    }

    public void sessionDestroyed(HttpSessionEvent se) {
      /* Session is destroyed. */
    }

    // -------------------------------------------------------
    // HttpSessionAttributeListener implementation
    // -------------------------------------------------------

    public void attributeAdded(HttpSessionBindingEvent sbe) {
      /* This method is called when an attribute 
         is added to a session.
      */
    }

    public void attributeRemoved(HttpSessionBindingEvent sbe) {
      /* This method is called when an attribute
         is removed from a session.
      */
    }

    public void attributeReplaced(HttpSessionBindingEvent sbe) {
      /* This method is invoked when an attibute
         is replaced in a session.
      */
    }

}
