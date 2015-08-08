<h1><%= article.title %></h1>
<%= article.author %>
<p><%= article.content %></p>

<form action="<%= article._id %>" method="post">
    <input type="hidden" name="_method" value="delete">
    <input type="submit" value="delete">
    <a href="<%= article._id %>/edit">edit</a>
  </form>