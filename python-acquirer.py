#!/usr/bin/env python3
import os

jsonStringTemplate = """
{
  "fileMarkList":[
    {
      "path": "%(main_path)s",
      "marks":[
        {
          "type": "GutterLink",
          "gutterLinkType": "D",
          "targetPath": "%(adding_path)s",
          "target": {
            "line": 2,
            "character": 3
          },
          "range": {
            "start": {
              "line": 3,
              "character": 3
            },
            "end": {
              "line": 3,
              "character": 27
            }
          },
          "checkContent": "print(adding.add(8, 7))"
        },
        {
          "type": "RedUnderLineDecoration",
          "range": {
            "start": {
              "line": 3,
              "character": 3
            },
            "end": {
              "line": 3,
              "character": 27
            }
          },
          "checkContent": "print(adding.add(8, 7))"
        },
        {
          "type": "Suffix",
          "text": "ZeroDivisionError: division by zero",
          "range": {
            "start": {
              "line": 3,
              "character": 3
            },
            "end": {
              "line": 3,
              "character": 27
            }
          },
          "checkContent": "print(adding.add(8, 7))"
        }
      ]
    },
    {
      "path": "%(adding_path)s",
      "marks":[
        {
          "type": "GutterLink",
          "gutterLinkType": "U",
          "targetPath": "%(main_path)s",
          "target": {
            "line": 3,
            "character": 3
          },
          "range": {
            "start": {
              "line": 2,
              "character": 3
            },
            "end": {
              "line": 2,
              "character": 20
            }
          },
          "checkContent": "return a + b / 0"
        },
        {
          "type": "RedUnderLineDecoration",
          "range": {
            "start": {
              "line": 2,
              "character": 3
            },
            "end": {
              "line": 2,
              "character": 20
            }
          },
          "checkContent": "return a + b / 0"
        },
        {
          "type": "Suffix",
          "text": "ZeroDivisionError: division by zero",
          "range": {
            "start": {
              "line": 2,
              "character": 3
            },
            "end": {
              "line": 2,
              "character": 20
            }
          },
          "checkContent": "return a + b / 0"
        }
      ]
    }
  ],
  "exceptions":[
    {
      "path": "%(adding_path)s",
      "description": "python adding.py: ZeroDivisionError: division by zero",
      "line": 2
    }
  ]
}
"""
paths = {
    "main_path": os.path.abspath("test/main.py"),
    "adding_path": os.path.abspath("test/adding.py"),
}

jsonString = jsonStringTemplate % paths
print(jsonString)
