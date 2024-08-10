<template>
    <div class="brandingbody">
        <h1>Branding resources for WEG</h1>
        <p>As all companies and organizations have branding, so does the Weather Emergency Group. Having branding allows us to make sure everything is on par with our standards, along with allowing partnering agencies to use resources without having to worry about making sure the right logo is being used. We have created this page to allow our partners to have access to resources that departments might need in terms of  WEG assets. </p>
        <h3>Color</h3>
        <p>WEG uses several colors on graphics to ensure the best contrast, but being able to keep our identity. When creating graphics that are associated with WEG, partners are expected to use the proper colors listed.</p>
        <div class="colordisplaybuttons" style=" background-color: rgb(139, 24, 26); justify-content: center; margin: auto; padding: 3px; color: white; border: 2px solid black;  " >
            <p style="margin: 10px;">Red, #8b181a, RGB(139 24 26)</p>
        </div>
        <br>
        <div class="colordisplaybuttons" style=" background-color: rgb(250, 250, 250); justify-content: center; margin: auto; padding: 3px; color: rgb(139, 24, 26); border: 2px solid black;  " >
            <p style="margin: 10px;">White, #fafafa, RGB(250, 250, 250)</p>
        </div>
        <br>
        <div class="colordisplaybuttons" style="background-color: rgb(0, 0, 0); justify-content: center; margin: auto; padding: 3px; color: rgb(250, 250, 250); border: 2px solid black;  " >
            <p style="margin: 10px;">Black, #000000, RGB(0, 0, 0)</p>
        </div>
        <br>
        <div class="colordisplaybuttons" style=" background-color: rgb(54, 69, 79); justify-content: center; margin: auto; padding: 3px; color: rgb(250, 250, 250); border: 2px solid black;  " >
            <p style="margin: 10px;">Charcoal, #36454F, RGB(54, 69, 79)</p>
        </div>
        <br>
        <div class="colordisplaybuttons" style=" background-color: rgb(182, 182, 180); justify-content: center; margin: auto; padding: 3px; color: rgb(0, 0, 0); border: 2px solid black;  " >
            <p style="margin: 10px;">Gray Cloud, #B6B6B4, RGB(182, 182, 180)</p>
        </div>
        <br>
        <h3>Fonts</h3>
        <p>WEG has no dedicated fonts, although the font used in the logo is free to download from the <a href="https://drive.google.com/drive/folders/1b5NACyzF9eSxqOmKRbPP_sWlMcYpGR3n?usp=sharing">WEG Google Drive</a></p>
        <h3>Logos</h3>
        <p>Cade has designed specific logos to be used if you need more than WEG. Multiple different options from jpg, png, to svg, along with solid background or transparent background, or even just the wording WEG. All of the logos can be found in the <a href="https://drive.google.com/drive/folders/1b5NACyzF9eSxqOmKRbPP_sWlMcYpGR3n?usp=sharing">WEG Google Drive</a> </p>
        <h4>Examples of our logo</h4>
        <div class="logoexamples">
            <div>
                <img src='@/assets/WEGwSLD512.png'>
                <img src='@/assets/WEG_Red.png'>
                <img src='@/assets/WEGwBKG1080.png'>
            </div>
        </div>
        <br>
        <br>
    </div>
</template>

<script>

export default {
    name: 'BrandingPage',
    components: {
    }
}
</script>

<style>

@media only screen and (max-width: 767px) {
    .brandingbody {
        width: 80%;
        margin: auto;
        justify-content: center;
        text-align: center;
    }
    .colordisplaybuttons {
        width: 90%;
        margin: auto;
        font-size: 13px;
    }
}
@media only screen and (min-width: 767px) {
    .brandingbody {
        width: 500px;
        margin: auto;
        justify-content: center;
        text-align: center;
    }
}
.logoexamples {
    display: inline-block;
    width: 80%;
}
.logoexamples img {
    height: 64px;
    padding: 5px;
}

</style>