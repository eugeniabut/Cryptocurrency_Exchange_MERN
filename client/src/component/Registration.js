import React from 'react'

function Registration() {
  return (
    <div>
<h1>Registration Form</h1>
Use tab keys to move from one input field to the next.
<form name='registration'>
<ul>
<li><label for="firstName">firstName:</label></li>
<li><input type="text" name="firstName" size="50" /></li>
<li><label for="lastName">lastName:</label></li>
<li><input type="text" name="lastName" size="50" /></li>
<li><label for="passId">Password:</label></li>
<li><input type="password" name="password" size="12" /></li>

<li><label for="passId">confirmPassword:</label></li>
<li><input type="password" name="confirmPassword" size="12" /></li>
<li><label for="address">Address:</label></li>
<li><input type="text" name="address" size="50" /></li>
<li><label for="email">email:</label></li>
<li><input type="text" name="email" size="50" /></li>
<li><label for="country">Country:</label></li>
<li><select name="country">
<option selected="" value="Default">(Please select a country)</option>
<option value="AF">Australia</option>
<option value="AL">Canada</option>
<option value="DZ">India</option>
<option value="AS">Russia</option>
<option value="AD">USA</option>
</select></li>
<li><label for="zip">ZIP Code:</label></li>
<li><input type="text" name="zip" /></li>
<li><label for="email">Email:</label></li>
<li><input type="text" name="email" size="50" /></li>
<li><label id="gender">Sex:</label></li>
<li><input type="radio" name="msex" value="Male" /><span>Male</span></li>
<li><input type="radio" name="fsex" value="Female" /><span>Female</span></li>
<li><label>Language:</label></li>
<li><input type="checkbox" name="en" value="en" checked /><span>English</span></li>
<li><input type="checkbox" name="nonen" value="noen" /><span>Non English</span></li>
<li><input type="submit" name="submit" value="Submit" /></li>
</ul>
</form>    </div>
  )
}

export default Registration
