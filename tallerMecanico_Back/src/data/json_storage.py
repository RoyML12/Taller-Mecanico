from __future__ import annotations
import json
from pathlib import Path
from typing import Any, Dict, List

class JsonStorage:
    def __init__(self, file_path: Path):
        self.file_path = file_path
        self.file_path.parent.mkdir(parents=True, exist_ok=True)
        if not self.file_path.exists():
            self._write([])

    def _read(self) -> List[Dict[str, Any]]:
        with self.file_path.open("r", encoding="utf-8") as f:
            return json.load(f)

    def _write(self, data: List[Dict[str, Any]]) -> None:
        with self.file_path.open("w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def list(self) -> List[Dict[str, Any]]:
        return self._read()

    def save_all(self, items: List[Dict[str, Any]]) -> None:
        self._write(items)

    def next_id(self, id_field: str) -> int:
        items = self._read()
        if not items:
            return 1
        return max(int(x.get(id_field, 0)) for x in items) + 1
