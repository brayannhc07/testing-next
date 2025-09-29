'use client';

export default function Client() {
    const FOO = process.env.FOO;
    return (
        <main>
            <h1>Client</h1>
            <p>FOO: {FOO}</p>
        </main>
    );
}
