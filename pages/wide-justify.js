import Head from "next/head";
import Demo from "../components/demo";

const name = "wide justify";

const para = `That's the way every day goes
Every time we've no control
If the sky is pink and white
If the ground is black and yellow
It's the same way you showed me
Nod my head, don't close my eyes
Halfway on a slow move
It's the same way you showed me
If you could fly, then you'd feel south
Up north's getting cold soon
The way it is, we're on land
Still I'm someone to hold true
Keep you cool when it's still alive
Won't let you down when it's all ruin
Just the same way you showed me, showed me
You showed me love
Glory from above
Regard, my dear
It's all downhill from here
In the wake of a hurricane
Dark skin of a summer shade
Nosedive into flood lines
Tall tower of milk crates
It's the same way you showed me
Cannonball off the porch side
Older kids trying off the roof
Just the same way you showed me (You showed)
If you could die and come back to life
Up for air from the swimming pool
You'd kneel down to the dry land
Kiss the Earth that birthed you
Gave you tools just to stay alive
And make it out when the sun is ruined
That's the same way you showed me, showed me
You showed me love
Glory from above
Regard, my dear
It's all downhill from here
Remember life, remember how it was
Climb trees, Michael Jackson, it all ends here
Say what up to Matthew, to Shoob
Say what up to Danny
Say what up to life immortality
Bending up my Nikes
Running out the melpomene, nicotine
Stealing granny cigs (Take it easy)
Gimme something sweet
Bitch, I might like immortality
This is life, life immortality`;

function wrapTo(text, maxLineLength = 30, endOnFullStop = true) {
  const words = text.split(" ");
  maxLineLength = Math.max(maxLineLength, ...words.map((w) => w.length));

  const lines = [];
  let line = [];

  function currentLineLength(additionalWord) {
    if (additionalWord) {
      return [...line, additionalWord].join(" ").length;
    }
    return line.join(" ").length;
  }
  if (text.includes("\n")) {
    return text.split("\n").map((l) => l.split(" "));
  } else {
    for (let word of words) {
      if (currentLineLength(word) < maxLineLength) {
        line.push(word);
        if (endOnFullStop && word.endsWith(".")) {
          lines.push(line);
          line = [];
        }
      } else {
        lines.push(line);
        line = [word];
      }
    }
  }

  return lines;
}

function Line({ words }) {
  return (
    <div className="flex justify-between">
      {words.map((w, i) => (
        <div key={i} className="flex">
          {w}
        </div>
      ))}
    </div>
  );
}

function Paragraph({ text }) {
  const wrapped = wrapTo(text);
  return (
    <>
      {wrapped.map((line, i) => (
        <Line words={line} key={i}></Line>
      ))}
    </>
  );
}

export default function WideJustify() {
  return (
    <Demo name={name}>
      <Head>
        <title>{name}</title>
      </Head>
      <Paragraph text={para}></Paragraph>
    </Demo>
  );
}
