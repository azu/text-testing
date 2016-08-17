# Illustration

```js
const sections = createSections(text);
const sections = sections.filter(contain("暗黙的な変換"));
sections.find(contain("意図しない"));
```

DLS

```js
section("暗黙的な変換", (sections) => {
	sections.contain("意図しない", (results) => {
	
	});
});
```

DLS

	- "暗黙的な変換" により
		- "意図しない" 挙動がおきやすい
	- そのため "暗黙的な経間" を
		- **避け** た方が "良い"