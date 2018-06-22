defmodule Mp3Stat do
  defstruct path: nil, flags: %{}
end

defmodule Music do
  @moduledoc """
  Documentation for Music.
  """

  @doc """
  Plop
  ## Cute kittens everywhere

      iex> Music.collect_data
      :world

  """

  require FileManip
  @music_path "./mp3"

  def get_mp3_files(path \\ @music_path) do
    filter_mp3 = fn file_path -> file_path |> String.downcase() |> Path.extname() == ".mp3" end

    FileManip.find(path, filter_mp3)
  end

  def get_file_stat(file_path) do
    {:ok, file_content} = File.read(file_path)

    %Mp3Stat{
      path: Path.absname(file_path),
      flags: ID3v2.frames(file_content)
    }
  end

  def collect_metadata(path \\ @music_path) do
    get_mp3_files(path)
    |> Enum.map(&get_file_stat/1)
  end

  # filter mp3 -> get content and path -> extract metadata
  # func 1 : extract metadata from file_path
  # func 2 : filter mp3
end
