function heavyTask(n) {
    const start = Date.now();

    // BLOCK the event loop for 5 seconds
    while (Date.now() - start < 5000) {
      // busy wait
    }
    return 'Hey there'
}

process.on("message", (data) => {
  const result = heavyTask(data.number);
  process.send(result);
});
