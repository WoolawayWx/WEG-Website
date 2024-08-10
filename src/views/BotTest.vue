<template>
    <site_header></site_header>
    <h1>Bot Testing In Progress</h1>
    <button @click="PushBot" type="submit">Push Update</button>
    <site_footer></site_footer>
    
</template>

<script>
import site_footer from '@/components/site_footer.vue';
import site_header from '@/components/site_header.vue';
import Slack from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config()

const app = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
})

export default {
    components: {
        site_footer,
        site_header
    },
    data() {
        return {
            title: "",
            body: ""
        }
    },
    methods: {
        PushBot() {
            app.client.chat.postMessage({
                token: process.env.SLACK_BOT_TOKEN,
                channel: "test",
                text: "Testing"
            })
        }
    }
};
</script>

<style>
</style>