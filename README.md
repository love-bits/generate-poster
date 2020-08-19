
# generate-poster

Command to generate Love Bits meetup poster.

## Install

To run this project, you'll need Git and Node.js. Run this in your terminal:

```bash
# Clone this repository
$ git clone https://github.com/love-bits/generate-poster.git

# Go into the folder
$ cd generate-poster

# Install dependencies
$ npm install
```

If you want the **generate-poster** command to be globally-installed, also run the command:
```bash
$ npm link
```

## Usage

You can see the available options running `generate-poster --help` (or `node index.js --help`):
```
$ generate-poster --help
Usage: generate-poster [options]

Generate Love Bits meetup poster

Remember: Use double quote in arguments with space

Options:
  -V, --version                output the version number
  -f, --fileName [filename]    Set the file name (default: "poster")
  -p, --presenter [presenter]  Set presenter name
  -t, --title [title]          Set meetup title
  -d, --date [date]            Set meetup date -> Format dd/mm
  -h, --hour [hour]            Set meetup hour -> Format 00:00
  -r, --role [role]            Set presenter role
  -l, --link [link]            Set meetup link
  -i, --image [image]          Set presenter image
  --help                       display help for command
```
