type State = "normal" | "modifier"

function splitKeystrokes(keystrokes: string): string[] {
  let state: State = "normal"
  let bucket = []
  const keystrokesArray = []

  for (let i = 0; i < keystrokes.length; i++) {
    const char = keystrokes[i]

    if (state == "normal") {
      if (char == "[") {
        state = "modifier"
        bucket = []
        continue
      }
      keystrokesArray.push(char)
    }

    if (state == "modifier") {
      if (char == "]") {
        state = "normal"
        keystrokesArray.push("[" + (bucket || []).join("") + "]")
        continue
      }
      bucket.push(char)
    }
  }

  return keystrokesArray
}

export default splitKeystrokes
