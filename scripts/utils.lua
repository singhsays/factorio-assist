-- utility functions
require 'lfs'

path = require 'pl.path'
pretty = require 'pl.pretty'
dir = require 'pl.dir'
file = require 'pl.file'
stringx = require 'pl.stringx'
stringx.import()


ExtendTable = {}
function ExtendTable:new(o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end
function ExtendTable:extend(other)
  for key, value in pairs(other) do
    self[key] = value
  end
end

function GetDefaultGameDir()
  -- Mac OSX
  if path.isdir("/Applications") then return "/Applications/factorio.app/Contents/data" end
  -- Windows
  if path.isdir("C://Users") then return "C://Program Files//Factorio//data" end
  -- Unknown
  return nil
end

function GetRecipes()
  datadir = path.join(GAMEDIR, 'base', 'prototypes', 'recipe')
  datafiles = dir.getfiles(datadir)
  if #datafiles == 0 then
    print("No recipe files found.")
    return
  end
  data = ExtendTable:new({})
  for _, filename in ipairs(datafiles) do
    dofile(filename)
  end
  return data
end

function GetIcon(name)
  iconfile = name  .. ".png"
  iconpath = path.join(GAMEDIR, 'base', 'graphics', 'icons', iconfile)
  if path.isfile(iconpath) then
    destpath = path.join(DESTDIR, 'img', iconfile)
    file.copy(iconpath, destpath)
  end
end
