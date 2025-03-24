## Resume (Suresh Yadav)

Resume that can be viewed online or printed/exported to PDF.

<hr />
<details open>
<summary><strong>Usage</strong></summary>
<ol>
<li> Open and edit <code><a href="https://github.com/0sureshyadav0/portfolio/resume/blob/master/data.js">data.js</a></code> file</li>
<li> Modify colors in <code><a href="https://github.com/0sureshyadav0/portfolio/resume/blob/master/style.css">style.css</a></code> file, inside <code>:root</code> block</li>
<li>Replace assets (images, fonts) with your own assets</li>
</ol>
</details>

<details>
<summary><strong>Example</strong></summary>
<ol>
<li>
<code><a href="https://github.com/0sureshyadav0/portfolio/resume/blob/master/data.js">data.js</a></code> file
<pre>
<code>
const userDetails = {
  name: "Suresh Yadav",
  designation: "Full Stack Developer",
  description:
    "Computer Science undergraduate with 2+ years of experience in Web Development, Flutter, Dart & C  as well as in Android and iOS development. I can provide you with application & web development using Flutter framework. As I am mostly a self-learner, I can easily adapt to new things and always ready to take on a challenge. <br> Click <a href='https://sureshyadav.info.np/' >here</a> for more info",
    picture: {
    src: "suresh.jpg",
    link: "https://github.com/0sureshyadav0",
    },
    startDate: "01 Mar 2022",
    updateDate: "24 Mar 2025",
    links: [
    {
      icon: "fa fa-envelope-open",
      tooltip: "Send mail",
      label: "sureshyadav_np@outlook.com",
      link: "mailto:sureshyadav_np@outlook.com?subject=Job%20offer",
    },
    {
      icon: "fa fa-map-marker-alt",
      tooltip: "View in maps",
      label: "Dang, Nepal",
      link: "https://goo.gl/maps/srwPcAxy5S32",
    },
    {
      icon: "fa fa-mobile-alt",
      tooltip: "Call",
      label: "+977-9829552758",
      link: "tel:+922-9829552758",
    },
    {
      icon: "fa fa-globe",
      tooltip: "Visit",
      label: "www.sureshyadav.info.np",
      link: "https://www.sureshyadav.info.np",
    },
  ],
  sns: [
    {
      icon: "fab fa-github",
      tooltip: "Github",
      link: "https://github.com/0sureshyadav0",
    },
    {
      icon: "fab fa-stack-overflow",
      tooltip: "Stack Overflow",
      link: "https://stackoverflow.com/users/20845494/suresh-yadav",
    },
    {
      icon: "fab fa-linkedin",
      tooltip: "LinkedIn",
      link: "https://www.linkedin.com/in/0sureshyadav0/",
    },
    {
      icon: "fab fa-quora",
      tooltip: "Quora",
      link: "https://www.quora.com/profile/Suresh-Yadav-2725",
    },
  ],
  qrCode: "qr-code.png",
};

</code>
</pre>
</li>

<li>
<code><a href="https://github.com/0sureshyadav0/portfolio/resume/blob/master/style.css">style.css</a></code> file
<pre>
<code>
:root {
    --bg: #cdcdcd;
    --card: #ffffff;
    --text: #39395b;
    --altText: #ffffff;
    --link: green;
    --header: #39395b;
    --headerText: #ffffff;
    --headerAlt: #545487;
    --headerAltText: #ffffff;
    --headerAltLink: #b08fff;
    --accent: #8D61F7;
    --grey: #888888;
}
</code>
</pre>
</li>
</ol>
</details>
