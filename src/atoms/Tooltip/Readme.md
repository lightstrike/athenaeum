Tooltip Example:

```jsx
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Tooltip left>
      I'm a left tooltip!
    </Tooltip>
    <Tooltip>
      I'm a tooltip!
    </Tooltip>
    <Tooltip right>
      I'm a right tooltip!
    </Tooltip>
  </div>
```

Tooltip with custom text

```jsx
  <Tooltip text='When you hover over me I become a tooltip'>
    See!
  </Tooltip>
```

Inline Tooltip Example:

```jsx
  <TextComponent>
    <Tooltip left>I'm a tooltip</Tooltip> Text with inlined tooltip
  </TextComponent>
```
