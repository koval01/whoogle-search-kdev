from enum import Enum


class Endpoint(Enum):
    autocomplete = "autocomplete"
    home = "home"
    healthz = "healthz"
    config = "config"
    opensearch = "opensearch.xml"
    search = "search"
    search_html = "search.html"
    url = "url"
    imgres = "imgres"
    element = "element"
    window = "window"
    gfont = "gfont"
    cdnjs = "cdnjs"
    currency_history = "currency_history"
    currency_graph = "currency_graph"

    def __str__(self):
        return self.value

    def in_path(self, path: str) -> bool:
        return path.startswith(self.value) or \
               path.startswith(f"/{self.value}")
