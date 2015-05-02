-- Script to import data from Factorio

require "json"
require "utils"
file = require "pl.file"
path = require "pl.path"

-- Location of the game data directory.
-- defaults to /Applications/factorio.app/Contents/ for Mac OSX
--            C:\Program Files\Factorio for Windows
-- override with lua -e 'GAMEDIR=somepath'
GAMEDIR = GAMEDIR or GetDefaultGameDir()
DESTDIR = DESTDIR or "../data/v0.11.22"
recipes = GetRecipes(GAMEDIR)

for _,recipe in pairs(recipes) do
  GetIcon(recipe['name'])
end

jsonData = json.encode(data)
if jsonData ~= nil then
  print("imported " .. #recipes .. " recipes")
  file.write('../data/v0.11.22/recipes.json', jsonData)
end
