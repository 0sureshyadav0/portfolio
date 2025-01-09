## Resume (Suresh Yadav)

Resume that can be viewed online or printed/exported to PDF.

<hr />
<details open>
<summary><strong>Usage</strong></summary>
<ol>
<li> Open and edit <code><a href="https://github.com/rajyadavnp/resume/blob/main/data.js">data.js</a></code> file</li>
<li> Modify colors in <code><a href="https://github.com/rajyadavnp/resume/blob/main/style.css">style.css</a></code> file, inside <code>:root</code> block</li>
<li>Replace assets (images, fonts) with your own assets</li>
</ol>
</details>

<details>
<summary><strong>Example</strong></summary>
<ol>
<li>
<code><a href="https://github.com/rajyadavnp/resume/blob/main/data.js">data.js</a></code> file
<pre>
<code>
const userDetails = {
    name: "Raj Yadav",
    designation: "Full Stack Software Developer",
    description: "A multi-skilled and dedicated IT professional with over 5 years of experience, adept in software development, well-versed in different programming languages. Well-rounded experience in OOPs, mobile development and user-centered design. A prodigy in learning new technologies. Strong background in team management and delegation.",
    picture: {
        src: "raj.jpeg",
        link: "https://www.linkedin.com/in/rajyadavnp"
    },
    links: [
        {
            icon: "fa fa-envelope-open",
            tooltip: "Send mail",
            label: "rajyadav_np@outlook.com",
            link: "mailto:rajyadav_np@outlook.com?subject=Job%20offer",
        },
        {
            icon: "fa fa-map-marker-alt",
            tooltip: "View in maps",
            label: "JP Nagar Phase 5, Bangalore, India",
            link: "https://goo.gl/maps/srwPcAxy5S32",
        },
        {
            icon: "fa fa-mobile-alt",
            tooltip: "Call",
            label: "+91-733 8305986",
            link: "tel:+917338305986",
        },
        {
            icon: "fa fa-globe",
            tooltip: "Visit",
            label: "www.rajyadav-np.blogspot.com",
            link: "http://www.rajyadav-np.blogspot.com",
        },
    ],
    sns: [
        {
            icon: "fab fa-github",
            tooltip: "Github",
            link: "https://github.com/rajyadavnp",
        },
        {
            icon: "fab fa-stack-overflow",
            tooltip: "Stack Overflow",
            link: "https://stackoverflow.com/users/6230166/raj-yadav",
        },
        {
            icon: "fab fa-linkedin",
            tooltip: "LinkedIn",
            link: "https://www.linkedin.com/in/rajyadavnp/",
        },
        {
            icon: "fab fa-quora",
            tooltip: "Quora",
            link: "https://www.quora.com/profile/Raj-Yadav-133",
        },
    ],
    qrCode: "qr-code.png"
}

</code>
</pre>
</li>

<li>
<code><a href="https://github.com/rajyadavnp/resume/blob/main/style.css">style.css</a></code> file
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
