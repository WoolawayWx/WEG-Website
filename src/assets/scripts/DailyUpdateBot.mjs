import Slack from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();

const app = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    
});
const Message = "Hello"

const blocks = [
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Daily Update*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": Message
			}
		}
    ]

await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.SLACK_CHANNEL,
    text: "This is a test",
    blocks,
});