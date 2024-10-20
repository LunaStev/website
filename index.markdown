---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }}</title>
    <link rel="stylesheet" href="{{ '/css/style.css' | relative_url }}">
    <!-- Add Google AdSense Code Here -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
</head>
<body>
    <header>
        <h1>{{ site.title }}</h1>
    </header>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4304352889546147"
         crossorigin="anonymous"></script>

    <footer>
        <p>© {{ site.year }} {{ site.title }}</p>
    </footer>
</body>
</html>