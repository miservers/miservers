package org.safarit;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class LoginController {

    @RequestMapping("/")
    public String startPage() {
        return "login";
    }

    @RequestMapping("/signin")
    public String handleRequest(HttpServletRequest request) {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        if(username.isEmpty() || password.isEmpty()) 
            return "login";
        else
            return "welcome";
    }

}