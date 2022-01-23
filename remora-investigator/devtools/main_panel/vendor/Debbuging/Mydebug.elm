module Debbuging.Mydebug exposing (myDebug)

myDebug : String -> b -> c -> c
myDebug funcName b c =
                      let _ = Debug.log (String.concat ["DEBUG: function=[", funcName,"], data=",Debug.toString b]) ()
                      in c
