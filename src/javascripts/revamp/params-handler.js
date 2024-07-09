document.addEventListener("alpine:init", () => {
  Alpine.data("paramsHandler", () => ({
    el: null,
    csvDataUrl: "",
    async init() {
      this.el = this.$root;

      const allTextbox = this.el.querySelectorAll("input[data-param-key]");
      for (const textbox of allTextbox) {
        this.csvDataUrl = textbox.dataset.csvDataUrl;
        const paramKey = textbox.dataset.paramKey;
        const defaultValue = textbox.dataset.default;
        const id = textbox.id;

        const currentUrl = document.location.toString();
        const params = new URL(currentUrl).searchParams;
        const [, paramMap] = [...params].find(
          ([fieldname]) => fieldname === paramKey
        ) || [, null];
        let value = paramMap || null;

        if (this.csvDataUrl) {
          try {
            const csvData = await this.readCsv(this.csvDataUrl);
            for (const csvObj of csvData) {
              const [csvMap, mapValue] = Object.entries(csvObj)[0];
              console.log("🚀 ~ init ~ [csvMap, mapValue]:", [csvMap, mapValue])
              if (csvMap === paramMap) value = mapValue;
            }
          } catch {}
        }
        if (value !== null) this.fillValue(id, value, true);
        else this.fillValue(id, defaultValue);
      }
    },

    getSerializedData() {
      return [{ name: "firstname", value: "firstname" }];
    },

    fillValue(fieldname, value, disabled = false) {
      const input = this.el.querySelector(`[id="${fieldname}"]`);
      if (input) {
        switch (input.tagName) {
          case "SELECT":
            if (value) {
              const selectcontrol = input.closest("div");
              const listItem = selectcontrol?.querySelector(".select-items");
              const targetitem = [...(listItem?.children || [])].find(
                (item) => item.textContent === value
              );
              if (targetitem) {
                targetitem.click();
                if (disabled) selectcontrol.style.pointerEvents = "none";
              }
            }
            break;
          case "TEXTAREA":
            if (value) {
              input.value = value;
              if (disabled) input.disabled = true;
            }
            break;
          default:
            switch (input.type) {
              case "text":
                if (value) {
                  input.value = value;
                  if (disabled) input.disabled = true;
                }
                break;
              case "checkbox":
                if (value && value !== "false") {
                  const label = this.el.querySelector(`[for="${fieldname}"]`);
                  label?.click();
                  if (disabled) input.disabled = true;
                }
                break;
            }
            break;
        }
      }
    },

    async readCsv(url) {
      const csvData = [];
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.text();
        const rows = data.split("\n").slice(1); // Skip the header row
        rows.forEach((row) => {
          if (row.trim()) {
            const cols = row
              .match(/(".*?"|[^",;\s]+|[^,]+)(?=\s*[;,]|\s*$)/g)
              .map((col) => col.replace(/["']/g, "").trim());
            const csvObj = { [cols[0]]: cols[1] };
            csvData.push(csvObj);
          }
        });
        return csvData;
      } catch (error) {
        console.error("Error fetching or parsing CSV file:", error);
      }
    },
  }));
});
