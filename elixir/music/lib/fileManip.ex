defmodule FileManip do
  def find(path \\ ".", filter_fn \\ fn _ -> true end) do
    cond do
      File.regular?(path) -> [path]
      File.dir?(path) ->
        File.ls!(path)
        |> Enum.map(&Path.join(path, &1))
        |> Enum.map(&find/1)
        |> Enum.concat
	|> Enum.filter(filter_fn)
      true -> []
    end
  end

end
