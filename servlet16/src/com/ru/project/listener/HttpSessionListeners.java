package com.ru.project.listener;

import org.apache.log4j.Logger;

import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Created by 成如 on 13-12-12.
 *HttpSession 的相关监听器
 *
 *HttpSessionListener用于监听session的创建和销毁
 */
public class HttpSessionListeners  implements HttpSessionListener, HttpSessionAttributeListener{
    Logger log = Logger.getLogger(HttpSessionListeners.class);

    @Override
    public void attributeAdded(HttpSessionBindingEvent httpSessionBindingEvent) {

    }

    @Override
    public void attributeRemoved(HttpSessionBindingEvent httpSessionBindingEvent) {

    }

    @Override
    public void attributeReplaced(HttpSessionBindingEvent httpSessionBindingEvent) {

    }

    /**
     * HttpSessionListener用于监听session的创建和销毁
     *
     * 对每一个正在访问的用户，J2EE应用服务器会为其建立一个对应的HttpSession对象。当一个浏览器第一次访问网站的时候，
     * J2EE应用服务器会新建一个HttpSession对象 ，并触发 HttpSession创建事件 ，如果注册了HttpSessionListener事件监听器，
     * 则会调用HttpSessionListener事件监听器的sessionCreated方法。相反，当这个浏览器访问结束超时的时候，
     * J2EE应用服务器会销毁相应的HttpSession对象，触发 HttpSession销毁事件，
     * 同时调用所注册HttpSessionListener事件监听器的sessionDestroyed方法。
     */

    /**
     * 浏览器访问服务器时，J2EE应用服务器会新建一个HttpSession对象。
     * 在session未超时，同一个浏览器多页面访问，使用同一个session
     * 不同浏览器访问，使用不同session
     * @param httpSessionEvent
     */
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {
        System.out.println("浏览器访问服务器，J2EE应用服务器新建一个HttpSession对象，" +
                "并触发HttpSessionListener事件监听器的sessionCreated方法");
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        System.out.println("session超时，服务器销毁HttpSession对象，" +
                "并触发HttpSessionListener事件监听器的sessionDestroyed方法");
    }
}
