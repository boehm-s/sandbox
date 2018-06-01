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

    find_res = FileManip.find(path, filter_mp3)
    |> Enum.map(&File.read!(&1))
    |> Enum.map(&ID3v2.frames(&1))

    find_res
  end

  def collect_metadata() do
    mp3Files = get_mp3_files()
    IO.inspect  mp3Files
    # |> File.read() |>
  end

  def get_file_stat(file_path) do
    {:ok, contents} = File.read(file_path)

    result = ID3v2.frames(contents)
    IO.inspect result

    result
  end

end
