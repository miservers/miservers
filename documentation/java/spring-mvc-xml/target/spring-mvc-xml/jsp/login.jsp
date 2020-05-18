<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
   pageEncoding="ISO-8859-1"%>
   <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<html>
<head>
<title>Login Page</title>
<link rel="stylesheet" type="text/css" href="css/login.css">
</head>
<body>


 <form action="signin" method="post">
  <div class="imgcontainer">
    <img src="images/cocotama.jpg" alt="Cocotama" class="cocotama">
  </div>

  <div class="container">
    <b>User name: </b>
    <input type="text" placeholder="Enter Username" name="username">

    <br/>

    <b>Password: </b>&nbsp;
    <input type="password" placeholder="Enter Password" name="password" required>

    <br/>

    <div style="margin-left: 20%">
      <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>
    </div>
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <span class="psw">Forgot <a href="#">password?</a></span>
  </div>
</form> 

</body>
</html>
