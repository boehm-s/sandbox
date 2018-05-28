defmodule Mp3Edit do
  contents = File.read("./mp3/nested/07 Talk On The Street.mp3")
  # tag_header = ID3v2.header(contents)
  # {major, minor} = tag_header.version
  # IO.puts "ID3 version 2.#{major}.#{minor}"

  result = ID3v2.frames(contents)
  IO.puts "Track title: #{result.TIT2}"
  IO.puts "Track artist: #{result.TPE1}"
  IO.puts "Track album: #{result.TALB}"
end
