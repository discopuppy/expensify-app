const add = (a,b) => {
    return (a + b);
};

const generateGreeting = function(name = 'Anonymous') {
    return(`Hello ${name}!`);
};

test('should add two numbers', () => {
    const result = add(3, 4);

    expect(result).toBe(7);
});

test('should print name', () => {
    const result = generateGreeting('Zac');

    expect(result).toBe('Hello Zac!');
});

test('should generate no name', function() {
    const result = generateGreeting();

    expect(result).toBe('Hello Anonymous!');
});
