/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sportsity.util;

import javax.servlet.http.Cookie;

/**
 *
 * @author rustamkamberov
 */
public class CookieUtil {

    public static String getCookieValue(Cookie[] cookies, String cookieName) {
        
        String cookieValue = "";
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookieName.equals(cookie.getName())) {
                    cookieValue = cookie.getValue();
                }
            }
            return cookieValue;
        }
        else {
            return null;
        }
        
    }

}
