'use client';
import Navigation from '@/components/Navigation';

export default function Home() {
    // const CreateChat = async () => {
    //     const response = await fetch('https://fastcampus-chat.net/chat', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             name: '9조 단톡방',
    //             users: ['test01', 'test02', 'test03', 'test04', 'test05'],
    //             isPrivate: false,
    //         }),
    //         headers: {
    //             'content-type': 'application/json',
    //             serverId: '53b9f98a',
    //             Authorization:
    //                 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYjlmOThhOnRlc3QwMSIsImlhdCI6MTY5OTQ2NDg5MiwiZXhwIjoxNzAwMDY5NjkyfQ.6QdnpwqNP7X-wF0e2CspB1kx0oNLowa4NARDgiU9wXs',
    //         },
    //     });
    //     const data = await response.json();
    //     console.log(data);
    // };

    return (
        <main>
            <a href="/login">로그인 페이지</a>
            <br></br>
            <div>
                <p>test01, 12345, 정민</p>
                <p>test02, 12345, 현진</p>
                <p>test03, 12345, 욱진</p>
                <p>test04, 12345, 지오</p>
                <p>test05, 12345, 종수</p>
            </div>
            <a href="/chating/79fa7366-807e-4cdc-9c91-b02331889c89">9조 단톡방</a>
            <Navigation></Navigation>
        </main>
    );
}
